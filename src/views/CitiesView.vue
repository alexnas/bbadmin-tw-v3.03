<script setup lang="ts">
import TableViewContainer from '@/views/TableViewContainer.vue'
import CitiesTable from '@/components/CitiesTable.vue'

const pageTitle = 'Cities List'
</script>

<template>
  <table-view-container :pageTitle="pageTitle">
    <cities-table />
  </table-view-container>
</template>
