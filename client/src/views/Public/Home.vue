<template>
  <ProviderFinder />
  <FooterBlock />
</template>

<script>
import ProviderFinder from "../../components/ProviderFinder.vue";
import FooterBlock from "../../components/FooterBlock.vue";
export default {
  name: "HomePage",
  components: {
    ProviderFinder,
    FooterBlock
  },
};
</script>