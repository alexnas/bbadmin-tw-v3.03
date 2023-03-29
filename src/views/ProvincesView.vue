<script setup lang="ts">
import TableViewContainer from './TableViewContainer.vue'
import ProvincesTable from '@/components/ProvincesTable.vue'
const pageTitle = 'Provinces List'
</script>

<template>
  <table-view-container :pageTitle="pageTitle">
    <provinces-table />
  </table-view-container>
</template>
