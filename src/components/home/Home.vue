<template>
  <div class="body">
    <h1 class="main-title">{{ title }}</h1>
    <input 
      type="search"
      class="filter"
      placeholder="Type here..."
      v-on:input="filter = $event.target.value"
    />
    <ul class="photo-list">
      <li class="photo-item" v-for="photo of photosFiltered">
        <dashboard :title="photo.titulo">
          <img-responsive :url=photo.url title=photo.title />
        </dashboard>
      </li>
    </ul>
  </div>
</template>

<script>
import Dashboard from '../shared/dashboard/Dashboard.vue';
import ImgResponsive from '../shared/img-responsive/Img-responsive.vue';

export default {
  components: {
    "dashboard": Dashboard,
    "img-responsive": ImgResponsive
  },
  data() {
    return {
      title: "AluraPic",
      photos: [],
      filter: '',
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
    this.$http.get('http://localhost:3000/v1/fotos')
      .then(response => response.json())
      .then(photos => this.photos = photos)
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