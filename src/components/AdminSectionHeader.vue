<template>
    <div class="section-admin-default__header">
        <div class="section-admin-default__row">
            <div class="section-admin-default__col section-admin-default__col-6">
                <h1><slot name="title"></slot></h1>
            </div>
            <div class="section-admin-default__col section-admin-default__col-6">
                <slot name="search"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AdminSectionHeader',
}
</script>