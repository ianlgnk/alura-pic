<template>
    <div>
        <h1 class="title">Cadastro</h1>

        <h2 v-if="photo._id" class="title">Alterando</h2>

        <form @submit.prevent="addPhoto()">
            <div class="control">
                <label for="titulo">TÍTULO</label>
                <input 
                    id="titulo" 
                    autocomplete="off" 
                    v-model="photo.titulo"
                    v-validate data-vv-rules="required|min:3|max:10"
                    name="titulo"
                    data-vv-as="título"
                >
                <span v-show="errors.has('titulo')">{{ errors.first('titulo')}}</span>
            </div>
            <div class="control">
                <label for="url">URL</label>
                <input 
                    id="url"
                    name="url"
                    autocomplete="off"
                    v-model="photo.url"
                    v-validate data-vv-rules="required"
                >
                <span v-show="errors.has('url')">{{ errors.first('url')}}</span>
                <img-responsive
                    :url="photo.url"
                    :title="photo.titulo"
                    v-show="photo.url"
                />
            </div>
            <div class="control">
                <label for="descricao">DESCRIÇÃO</label>
                <textarea 
                    id="descricao"
                    autocomplete="off"
                    v-model="photo.descricao"
                >
                </textarea>
            </div>
            <div class="title">
                <default-button label="GRAVAR" type="submit"/>
                <router-link :to="{ name: 'Home'}"><default-button label="VOLTAR" type="button"/></router-link>
            </div>
        </form>
    </div>
</template>

<script>
import ImgResponsive from '../shared/imgresponsive/ImgResponsive.vue';
import Button from '../shared/button/Button.vue';
import Photo from '../../domain/photo/Photo';
import PhotoService from '../../domain/photo/PhotoService';

export default {
    components: {
        "img-responsive": ImgResponsive,
        "default-button": Button
    },
    data() {
        return {
            photo: new Photo(),
            id: this.$route.params.id
        }
    },
    methods: {
        addPhoto() {
            this.$validator
                .validateAll()
                .then(sucess => {
                    if (sucess) {
                        this.service
                            .addPhoto(this.photo)
                            .then(() => {
                                if (this.id) this.$router.push({ name: 'Home' });
                                this.photo = new Photo()
                            });
                    }
                });
        }
    },
    created() {
        this.service = new PhotoService(this.$resource);

        if (this.id) {
            this.service
                .searchPhoto(this.id)
                .then(photo => this.photo = photo);
        }
    }
}
</script>

<style scoped>
.title {
    text-align: center;
}
.control {
    font-size: 1.2em;
    margin-bottom: 20px;
}
.control label {
    display: block;
    font-weight: bold;
}

.control label + input, .control textarea {
    width: 100%;
    font-size: inherit;
    border-radius: 5px
}
</style>