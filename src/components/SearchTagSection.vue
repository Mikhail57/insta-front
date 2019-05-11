<template>
  <section>
    <h2>Поиск по тегу</h2>
    <b-container>
      <b-form @submit="submit">
        <b-form-group
          label="Тег:"
          label-for="tag-input"
        >
          <b-form-input v-model="tag" id="tag-input"></b-form-input>
        </b-form-group>
        <b-button
          type="submit"
          variant="primary"
          :disabled="submitDisabled">
          {{ submitText }}
        </b-button>
      </b-form>
      <br>
      <b-alert :show="error != null" variant="danger">Произошла ошибка: <br>{{ error }}</b-alert>
      <b-alert :show="error == null && points.length === 0" variant="info">Нет отметок...</b-alert>
    </b-container>
    <yandex-map
      :coords="[55, 105]"
      zoom="4"
      class="map"
    >
      <ymap-marker
        v-for="post in this.points"
        :key="post.id"
        :marker-id="post.id"
        :coords="[post.lat, post.lng]"
        marker-type="placemark"
        :icon="{color: 'red'}"
        :balloon="{
          header: post.location.name,
          body: genBody(post),
          footer: genFooter(post)
        }"
        cluster-name="1"
      />
    </yandex-map>
  </section>
</template>

<script>
export default {
  name: 'SearchTagSection',
  data() {
    return {
      tag: 'ФСИР',
      points: [],
      isLoading: false,
      error: null,
      // backendBaseUrl: 'http://localhost:8000/',
      backendBaseUrl: '/api',
    };
  },
  computed: {
    trimmedTag() { return this.tag.trim(); },
    isValidTag() { return this.trimmedTag.match(/^[\w\dа-яА-Я]+$/i) != null; },
    submitText() { return this.isLoading ? 'Загружаю...' : 'Получить'; },
    submitDisabled() { return this.isLoading || !this.isValidTag; },
  },
  methods: {
    submit(event) {
      event.preventDefault();
      this.isLoading = true;
      this.error = null;
      this.$http.get(`${this.backendBaseUrl}/tag/${this.trimmedTag}`)
        .then((response) => {
          this.points = response.body;
          this.isLoading = false;
        }, (error) => {
          this.isLoading = false;
          // console.log(`Error ${error}`);
          this.error = error;
        });
    },
    genBody(post) {
      let result = '';
      if (post.video_versions) {
        result = 'Видео...';
      }
      if (post.image_versions2) {
        result = `<img src='${post.image_versions2.candidates[1].url}'>`;
      }
      try {
        return `${result}<br>${post.caption.text}`;
      } catch (e) {
        return 'Информация недоступна....';
      }
    },
    genFooter(post) {
      return `<a href="//instagram.com/p/${post.code}" target="_blank">Пост</a>`;
    },
  },
};
</script>

<style scoped>
.map {
  margin-top: 1em;
  width: 100%;
  height: 600px;
}
</style>
