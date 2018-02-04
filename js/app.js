Vue.component("card", {
  template: `<div class="card">
							<div class="card__preview preview">
								<img class="preview__image" :src="'https://api.iriska.net/'+card.image.path">
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

// TODO wrap showcase to component
// Vue.component("showcase", {
//   template: `<div class="showcase" :class="showcase.blockModifier" :id="showcase.htmlId">
// 				<h2 class="title" :class="showcase.titleModifier">{{showcase.title}}</h2>
// 				<div class="row center-xs around-xs">
// 					<div v-for="card in cards" class="col-xs-12 col-sm-6 col-lg-3">
// 						<card v-bind="{card, openPopup}" />
// 					</div>
// 				</div>
// 			</div>`,
//   props: {
//     showcase: Object,
//     cards: Array,
//     openPopup: Function
//   }
// });

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
    banner: {
      title: "",
      banner: {
        path: "img/banner.jpg"
      },
      subtitle: "",
      remark: ""
    },
    orderTitle: "Специальное предложение",
    isFetched: false
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
    }
  },
  computed: {
    getBannerPath() {
      return `background-image:url(https://api.iriska.net/'+banner.banner.path+')`;
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      // alert("mounted!");
    });
  },
  beforeMount: function() {
    this.$nextTick(function() {
      const urls = [
        "https://api.iriska.net/api/collections/get/rosesMedium?token=e39ab586a1f84b73ae4dfb0ee3193c",
        "https://api.iriska.net/api/collections/get/rosesLarge?token=e39ab586a1f84b73ae4dfb0ee3193c",
        "https://api.iriska.net/api/collections/get/flowersSingle?token=e39ab586a1f84b73ae4dfb0ee3193c",
        "https://api.iriska.net/api/collections/get/flowersBox?token=e39ab586a1f84b73ae4dfb0ee3193c",
        "https://api.iriska.net/api/collections/get/flowersBasket?token=e39ab586a1f84b73ae4dfb0ee3193c",
        "https://api.iriska.net/api/collections/get/flowersIriska?token=e39ab586a1f84b73ae4dfb0ee3193c",
        "https://api.iriska.net/api/regions/data/banner?token=e39ab586a1f84b73ae4dfb0ee3193c"
      ];

      const fetchData = url =>
        fetch(url)
          .then(res => res.json())
          .then(res => res);

      Promise.all(urls.map(fetchData)).then(res => {
        const [
          rosesMedium,
          rosesLarge,
          flowersSingle,
          flowersBox,
          flowersBasket,
          flowersIriska,
          banner
        ] = res;
        this.rosesMedium = rosesMedium.entries;
        this.rosesLarge = rosesLarge.entries;
        this.flowersSingle = flowersSingle.entries;
        this.flowersBox = flowersBox.entries;
        this.flowersBasket = flowersBasket.entries;
        this.flowersIriska = flowersIriska.entries;
        this.banner = banner;
        this.isFetched = true;
      });
    });
  }
});
