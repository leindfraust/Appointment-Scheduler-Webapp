<template>
    <footer class="footer" style="background-color: white;">
        <div class="container is-fluid has-text-centered">
            <figure class="image" style="margin: auto; width: 15%">
                <img src="../assets/images/logos/medi-search-horizontal.png" />
            </figure>
            <div class="block"></div>
            <p class="subtitle is-6">Medic Search is a capstone project proposal in <strong>La Consolacion
                    College</strong> that is
                developed
                by Romel Jr Zerna, Mel Fatima Fernandez, Cloyde Catacutan and Gabriel Olmoguez. It is an online
                platform
                that allows patients to book their appointment online. Patients can search for doctors based on
                their
                location, specialty, and availability.</p>
            <div class="block"></div>
            <nav class="breadcrumb is-centered" aria-label="breadcrumbs">
                <ul>
                    <li>
                        <router-link :to="'/about'">About Medic Search</router-link>
                    </li>
                    <li>
                        <router-link :to="'/terms-and-conditions'">Terms and Conditions</router-link>
                    </li>
                    <li>
                        <router-link :to="'/contactus'">Contact Us</router-link>
                    </li>
                </ul>
            </nav>
            <div class="block">
                <strong>Copyright @2022-2023 Medic Search</strong>
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    name: "FooterPage"
}
</script>
<style scoped>
@media (max-width: 991.98px) {
    .image {
        width: 75% ! important
    }
}
</style>