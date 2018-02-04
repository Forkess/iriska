"use strict";

Vue.component("privacy-form", {
  props: {
    form: Object,
    title: String
  },
  components: {
    "vue-form-generator": VueFormGenerator.component
  },
  template:
    '\n<form class="sender" @submit.prevent="submit(processed_form, form.url)"><div class="form__title">{{title}}</div>\n<vue-form-generator :schema="form.schema" :model="form.model" :options="form.formOptions"></vue-form-generator>\n<div class="privacy">\n<div class="privacy__agree">\n<input type="checkbox" v-model="form.isAgree" :id="_uid+\'privacy\'">\n<label :for="_uid+\'privacy\'">{{form.privacy_pretext}} <a :href="form.privacy_link">{{form.privacy_link_text}}</a> {{form.privacy_posttext}}</label>\n</div>\n<div class="privacy__text" v-if="form.privacy__details">{{form.privacy__details}}</div>\n</div>\n<div class="sender__submit">\n<div class="button-slot"><button class="button button_stroke" type="submit" :disabled="!form.isAgree">{{form.button_text}}</button></div>\n</div>\n    <div class="sender__success" v-if="form.isSent">{{form.success_message}}</div>\n</form>\n',
  computed: {
    processed_form: function processed_form() {
      var data = [];
      for (var i = 0; i < this.form.schema.fields.length; i++) {
        var field = this.form.schema.fields[i];
        var entry = {};
        entry.label = field.label;
        entry.data = this.form.model[field.model];
        data.push(entry);
      }
      const orderTitle = {
        label: "Выбранный товар",
        data: app.orderTitle
      };
      data.push(orderTitle);
      return {
        form_data: data,
        subject: this.form.subject
      };
    }
  },
  methods: {
    submit: function submit(data, url) {
      var self = this;
      console.log(data);
      this.post(data, url, function(result) {
        if (result) {
          for (var field in self.form.model) {
            self.form.model[field] = null;
            self.form.isAgree = false;
          }
          self.form.isSent = true;
          setTimeout(function() {
            self.form.isSent = false;
          }, 3e3);
        }
      });
    },
    post: function post(data, url, success) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url, !0);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(data));
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          success(xhr.responseText);
        }
      };
    }
  }
});
