Vue.component("card", {
  template: `<div class="card">
							<div class="card__preview preview">
								<img @click="openPreview(card.image.path)" class="preview__image" :src="'https://api.iriska.net/'+card.image.path">
							</div>
							<div class="card__details">
								<div class="card__title">{{card.title}}</div>
								<div class="card__price">{{card.price}} руб.</div>
							</div>
							<button @click="openPopup(card.title)" class="button" :class="{ 'button_secondary': card.isFeatured }">Заказать</button>
            </div>`,
  props: {
    card: Object,
    openPopup: Function,
    openPreview: Function
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
    isPreviewOpen: false,
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
    previewUrl: "",
    isFetched: false,
    contact_us: {
      // privacy
      isAgree: false,
      privacy_details:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis maxime est nihil, a dolorem suscipit excepturi non blanditiis libero, ipsa tenetur.",
      privacy_link: "agreement.html",
      privacy_pretext: "Я согласен с условиями",
      privacy_link_text: "пользовательского соглашения",
      privacy_posttext: "",
      // misc
      button_text: "Отправить",
      subject: "Пробная отправка компонента формы",
      isSent: false,
      success_message: "Ваше сообщение доставлено.",
      url: "/process.php",
      // model, scheme
      model: {
        name: "",
        phone: "",
        text: ""
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            id: "name",
            label: "Имя",
            model: "name",
            readonly: false,
            required: true,
            disabled: false,
            placeholder: "Ваше имя",
            validator: VueFormGenerator.validators.string,
            styleClasses: "form__field"
          },
          {
            type: "input",
            inputType: "text",
            id: "phone",
            label: "Телефон",
            model: "phone",
            readonly: false,
            required: true,
            disabled: false,
            placeholder: "Телефон",
            validator: VueFormGenerator.validators.string,
            styleClasses: "form__field"
          },
          {
            type: "textArea",
            inputType: "textArea",
            id: "text",
            label: "Комментарий к заказу",
            model: "text",
            readonly: false,
            required: true,
            disabled: false,
            placeholder: "Комментарий к заказу",
            validator: VueFormGenerator.validators.string,
            styleClasses: "form__field"
          }
        ]
      },
      formOptions: {
        validateAfterChanged: true
      }
    }
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
    openPreview(url) {
      this.isPreviewOpen = true;
      this.setPreviewUrl(url);
    },
    closePreview() {
      this.isPreviewOpen = false;
      this.setPreviewUrl("");
    },
    setPopupTitle(title) {
      this.orderTitle = title;
    },
    setPreviewUrl(url) {
      this.previewUrl = url;
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
        "https://api.iriska.net/api/collections/get/rosesMedium?token=c825ea67579bdb0ea7e9f0507ce6d8",
        "https://api.iriska.net/api/collections/get/rosesLarge?token=c825ea67579bdb0ea7e9f0507ce6d8",
        "https://api.iriska.net/api/collections/get/flowersSingle?token=c825ea67579bdb0ea7e9f0507ce6d8",
        "https://api.iriska.net/api/collections/get/flowersBox?token=c825ea67579bdb0ea7e9f0507ce6d8",
        "https://api.iriska.net/api/collections/get/flowersBasket?token=c825ea67579bdb0ea7e9f0507ce6d8",
        "https://api.iriska.net/api/collections/get/flowersIriska?token=c825ea67579bdb0ea7e9f0507ce6d8",
        "https://api.iriska.net/api/regions/data/banner?token=c825ea67579bdb0ea7e9f0507ce6d8"
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
