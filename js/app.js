Vue.component("card", {
  template: `<div class="card">
							<div class="card__preview preview">
								<img class="preview__image" :src="'http://iriska.dubaua.ru/'+card.image.path">
							</div>
							<div class="card__details">
								<div class="card__title">{{card.title}}</div>
								<div class="card__price">{{card.price}} руб.</div>
							</div>
							<button @click="openPopup(card.title)" class="button" :class="{ 'button_secondary': card.isFeatured }">Заказать</button>
            </div>`,
  props: {
    card: Object,
    openPopup: Function
  }
});

var app = new Vue({
  el: "#app",
  data: {
    isPopupOpen: false,
    rosesMedium: [],
    rosesLarge: [],
    flowersSingle: [],
    flowersBox: [],
    flowersBasket: [],
    flowersIriska: [],
    orderTitle: "Специальное предложение"
  },
  methods: {
    openPopup(title) {
      this.isPopupOpen = true;
      this.setPopupTitle(title);
    },
    closePopup() {
      this.isPopupOpen = false;
      this.setPopupTitle("Специальное предложение");
    },
    setPopupTitle(title) {
      this.orderTitle = title;
    },
    fetchData(url) {
      fetch(url)
        .then(res => res.json())
        .catch(error => console.error(error))
        .then(res => {
          console.log(res.entries);
          return res.entries;
        });
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // alert("mounted!");
    });
  },
  beforeMount: function() {
    this.$nextTick(function() {
      this.fetchData(
        "http://iriska.dubaua.ru/api/collections/get/rosesMedium?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ).then(res => (this.rosesMedium = res));
      this.fetchData(
        "http://iriska.dubaua.ru/api/collections/get/rosesLarge?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ).then(res => (this.rosesLarge = res));
      this.fetchData(
        "http://iriska.dubaua.ru/api/collections/get/flowersSingle?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ).then(res => (this.flowersSingle = res));
      this.fetchData(
        "http://iriska.dubaua.ru/api/collections/get/flowersBox?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ).then(res => (this.flowersBox = res));
      this.fetchData(
        "http://iriska.dubaua.ru/api/collections/get/flowersBasket?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ).then(res => (this.flowersBasket = res));
      this.fetchData(
        "http://iriska.dubaua.ru/api/collections/get/flowersIriska?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ).then(res => (this.flowersIriska = res));
    });
  }
});
