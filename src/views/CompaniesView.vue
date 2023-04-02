<script setup lang="ts">
import TableViewContainer from '@/views/TableViewContainer.vue'
import CompaniesTable from '@/components/CompaniesTable.vue'

const pageTitle = 'Companies List'
</script>

<template>
  <table-view-container :pageTitle="pageTitle">
    <companies-table />
  </table-view-container>
</template>
