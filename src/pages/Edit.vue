<template>
  <q-page class="column items-center q-pt-xl">
    <div>
      <q-card-section>
        <div class="text-h6">Name</div>
      </q-card-section>
      <q-input readonly dense v-model="name" />
      <q-card-section>
        <div class="text-h6">Age</div>
      </q-card-section>
      <q-input
        dense
        type="number"
        v-model.number="age"
        autofocus
        @keyup.enter="prompt = false"
      />
      <q-card-actions align="right" class="text-primary">
        <q-btn
          :disable="disableEdit"
          flat
          label="Save User"
          @click="editUser"
        />
      </q-card-actions>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      age: null,
      name: this.$route.params.name
    };
  },
  computed: {
    disableEdit() {
      if (this.age) return false;
      return true;
    }
  },
  methods: {
    ...mapActions("users", {
      edit_user: "edit_user"
    }),
    editUser() {
      this.edit_user({
        name: this.$route.params.name,
        age: this.age
      });
      this.age = null;
      this.$router.push("/");
    }
  }
};
</script>
