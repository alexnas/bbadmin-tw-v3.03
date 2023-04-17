<script setup lang="ts">
import TableViewContainer from './TableViewContainer.vue'
import RoutesTable from '@/components/RoutesTable.vue'
const pageTitle = 'Routes List'
</script>

<template>
  <table-view-container :pageTitle="pageTitle">
    <routes-table />
  </table-view-container>
</template>
