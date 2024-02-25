<template>
  <div>
    <!-- Change nullish to logical OR
      because param id is always provided in optional param -->
    <h1>{{ $route.params.id || 'User' }} Detail</h1>
  </div>
</template>
