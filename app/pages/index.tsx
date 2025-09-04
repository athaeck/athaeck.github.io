import { useI18n } from "vue-i18n";


export default defineComponent({

  setup() {
    const { t } = useI18n();
    return { t };
  },



  render() {
    return (
      <div>
        <h1> {this.t("Welcome")}</h1>
      </div>
    )
  },
})
