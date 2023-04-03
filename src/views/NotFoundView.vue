<template>
  <div class="mx-auto px-2 mb-4 sm:px-6 lg:px-8 flex flex-col overflow-y-auto">
    <h1 class="text-2xl text-red-500 text-center font-semibold text-gray-700 my-4">Error 404</h1>
    <h2 class="text-xl text-center text-gray-600 font-semibold text-gray-700 my-4">
      You try to open unavailable resource!
    </h2>
    <div class="flex justify-center">
      <button
        @click="$router.push('/')"
        class="focus:outline-none w-fit focus:ring-2 focus:ring-offset-2 focus:ring-orange-700 transition duration-150 ease-in-out hover:bg-orange-600 bg-orange-700 sm:rounded-lg text-white px-8 py-2 text-sm"
        type="button"
      >
        Home
      </button>
    </div>
  </div>
</template>
