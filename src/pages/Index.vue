<template>
  <q-page class="column items-center q-pt-xl">
    <q-btn
      color="primary"
      label="Add User"
      class="q-mb-md"
      @click="showModal = true"
    ></q-btn>
    <div v-for="user in getUsers" :key="user.name">
      <q-card class="q-mb-sm text-center cursor-pointer" style="width:300px">
        <q-item clickable>
          <q-item-section>
            <q-item-label>Name: {{ user.name }}</q-item-label>
            <q-item-label caption lines="2">Age: {{ user.age }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon name="delete" @click="deleteUser(user.name)" />
          </q-item-section>
        </q-item>
      </q-card>
    </div>

    <div v-if="!getUsers.length" class="text-h5 flex flex-center">
      Sorry! No users found.
    </div>

    <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Name</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="name"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-section>
          <div class="text-h6">Age</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            type="number"
            v-model.number="age"
            autofocus
            @keyup.enter="prompt = false"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn :disable="disableAdd" flat label="Add User" @click="addUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      showModal: false,
      name: "",
      age: null
    };
  },
  computed: {
    ...mapGetters("users", {
      getUsers: "getUsers"
    }),
    disableAdd() {
      if (this.name && this.age) return false;
      return true;
    }
  },
  methods: {
    ...mapActions("users", {
      add_user: "add_user",
      delete_user: "delete_user"
    }),
    deleteUser(name) {
      this.delete_user(name);
    },
    addUser() {
      this.add_user({
        name: this.name,
        age: this.age
      });
      this.showModal = false;
      (this.name = null), (this.age = null);
    }
  }
};
</script>
