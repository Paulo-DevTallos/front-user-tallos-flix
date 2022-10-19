<template>
  <b-navbar toggleable="lg" type="light">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item class="texto-navbar" :to="{ name: 'theaters' }">
          Somente nos Cinemas
        </b-nav-item>
        <b-nav-item :to="{ name: 'movies' }">
          Filmes
        </b-nav-item>
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
            <div class="m-2 name-user">Faça Login</div>
            <b-avatar
              variant="light-primary"
              size="40"
              src="../../../public/img/user-default.png"
            ></b-avatar>
          </div>
        </template>
        <b-dropdown-item class="color">Meus Favoritos</b-dropdown-item>
        <b-dropdown-item>Sair</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</template>

<style lang="scss" scoped></style>
