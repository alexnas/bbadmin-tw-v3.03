<script setup lang="ts">
import TableViewContainer from '@/views/TableViewContainer.vue'
import UsersTable from '@/components/UsersTable.vue'

const pageTitle = 'Users List'
</script>

<template>
  <table-view-container :pageTitle="pageTitle">
    <users-table />
  </table-view-container>
</template>
