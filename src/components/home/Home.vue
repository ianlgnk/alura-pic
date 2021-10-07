<template>
  <div class="body">
    <h1 class="main-title">{{ title }}</h1>
    <p v-show="message" class="main-title">{{ message }}</p>
    <input 
      type="search"
      class="filter"
      placeholder="Type here..."
      v-on:input="filter = $event.target.value"
    />
    <ul class="photo-list">
      <li class="photo-item" v-for="photo of photosFiltered">
        <dashboard :title="photo.titulo">
          <img-responsive 
            :url=photo.url 
            :title=photo.titulo
            v-transformer 
          />
          <router-link :to="{ name: 'Change', params: { id: photo._id }}">
            <default-button
              type="button"
              label="ALTERAR"
            />
          </router-link>
          <default-button
            type="button"
            label="REMOVE"
            @activeButton="remove(photo)" 
            :confirmation="true"
            styleName="danger"
          />
        </dashboard>
      </li>
    </ul>
  </div>
</template>

<script>
import Dashboard from '../shared/dashboard/Dashboard.vue';
import ImgResponsive from '../shared/imgresponsive/ImgResponsive.vue';
import Button from '../shared/button/Button.vue';
import PhotoService from'../../domain/photo/PhotoService'

export default {
  components: {
    "dashboard": Dashboard,
    "img-responsive": ImgResponsive,
    "default-button": Button
  },
  data() {
    return {
      title: "AluraPic",
      photos: [],
      filter: '',
      message: ''
    }
  },
  computed: {
    photosFiltered() {
      if (this.filter) {
        let exp = new RegExp(this.filter.trim(), 'i');
        return this.photos.filter(photo => exp.test(photo.titulo));
      } else {
        return this.photos;
      }
    }
  },
  created() {
    this.service = new PhotoService(this.$resource);

    this.service
      .listPhotos()
      .then(photos => this.photos = photos, err => this.message = err.message);
  },
  methods: {
    remove(photo) {
      this.service.removePhoto(photo._id)
        .then(() => {
          let index = this.photos.indexOf(photo);
          this.photos.splice(index, 1);
          this.message = 'Foto removida com sucesso';
        }, err => {
          this.message = err.message;
        });
    }
  }
}
</script>

<style>
.main-title {
  text-align: center;
}

.photo-list {
  list-style: none;
}

.photo-item {
  display: inline-block;
}

.filter {
  width: 100%;
}
</style>