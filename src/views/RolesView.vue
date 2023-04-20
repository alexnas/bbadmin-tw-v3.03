<script setup lang="ts">
import TableViewContainer from '@/views/TableViewContainer.vue'
import RolesTable from '@/components/RolesTable.vue'

const pageTitle = 'Roles List'
</script>

<template>
  <table-view-container :pageTitle="pageTitle">
    <roles-table />
  </table-view-container>
</template>
