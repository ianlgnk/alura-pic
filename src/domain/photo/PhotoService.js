export default class PhotoService {
    constructor(resource) {
        this._resource = resource('v1/fotos{/id}');
    }

    listPhotos() {
        return this._resource
            .query()
            .then(res => res.json(), err => {
                console.log(err);
                throw new Error('Não foi possível obter as fotos');
            });
    }

    addPhoto(photo) {
        if (photo._id) {
            return this._resource
                .update({ id: photo._id }, photo);
        } else {
            return this._resource
                .save(photo);
        }
    }

    removePhoto(id) {
        return this._resource
            .delete({ id })
            .then(null, err => {
                console.log(err);
                throw new Error('Não foi possível remover a foto');
            });
    }

    searchPhoto(id) {
        return this._resource
            .get({ id })
            .then(res => res.json());
    }
}