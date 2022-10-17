<template>
  <b-navbar toggleable="lg" type="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>Somente nos Cinemas</b-nav-item>
        <b-nav-item>Filmes</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-navbar-nav>
      <b-nav-item-dropdown
        toggle-class="d-flex align-items-center dropdown-user-link"
        right
        no-caret
      >
        <template #button-content>
          <div class="d-flex align-items-center">
            <div class="m-2">Nome do usuario</div>
            <b-avatar
              variant="light-primary"
              size="40"
              src="https://placekitten.com/300/300"
            ></b-avatar>
          </div>
        </template>
        <b-dropdown-item class="color">Meus Favoritos</b-dropdown-item>
        <b-dropdown-item>Sair</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<style>
.navbar {
  background: linear-gradient(
    0deg,
    rgba(143, 144, 144, 0.253) 0%,
    rgba(0, 0, 0, 0.76) 100%
  ) !important;
}
.nav-link {
  color: white !important;
  background-color: rgba(255, 255, 255, 0) !important;
}
.nav-link:focus {
  transition: 0.1s;
  background-color: rgba(255, 255, 255, 0) !important;
  border-bottom: 5px solid #c37259;
}
.navbar-brand {
  color: white;
}
.navbar-collapse {
  display: flex;
  justify-content: space-between;
  width: 50% !important;
}
.dropdown-menu {
  background-color: gray;
}
.dropdown-item {
  color: white !important;
}
</style>
