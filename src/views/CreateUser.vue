<template>
    <section class="section-create-user">
        <div class="container">
            <h1>Create User</h1>

            <FormCreateUser  />
        </div>
    </section>
</template>

<script>
    import FormCreateUser from '../components/Forms/FormCreateUser';

    export default {
        data: () => ({

        }),

        components: {
            FormCreateUser
        },

        
    }
</script>

<style lang="scss" scoped>
    .section-create-user {
        padding: 20px 0;
    }
</style>