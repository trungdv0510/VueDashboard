<template>
  <div class="row">
    <div class="col-sm-1">
    </div>
    <div class="col-sm-7 ml-5 ">
      <h3 class="borderItem mt-5 mb-5">Insert user</h3>
      <div class="mb-4">
        <form
          action=""
          method="post"
          @submit.prevent="onSubmit"
        >
          <div class="form-group">
            <label for="">Email: </label>
            <input
              type="text"
              name="email"
              id="email"
              class="form-control"
              placeholder="Enter your email"
              aria-describedby="helpId"
              v-model="email"
            >
            <span v-if="v$.email.$error"  class="text-danger">
                <span  v-for="item in v$.email.$errors" :key="item.id" style="display:block">
                      <i>{{ item.$message }}</i>
                </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">User name: </label>
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
              placeholder="Enter user name"
              aria-describedby="helpId"
              v-model="username"
            >
             <span v-if="v$.username.$error"  class="text-danger">
                <span  v-for="item in v$.username.$errors" :key="item.id" style="display:block">
                      <i>{{ item.$message }}</i>
                </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              placeholder="Enter your password"
              aria-describedby="helpId"
              v-model="password.password"
            >
            <span v-if="v$.password.password.$error"  class="text-danger">
                <span  v-for="item in v$.password.password.$errors" :key="item.id" style="display:block">
                      <i>{{ item.$message }}</i>
                </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">Enter the password again: </label>
            <input
              type="password"
              class="form-control"
              name="passwordconformen"
              id="passwordconformen"
              placeholder="Enter the password agains"
              aria-describedby="helpId"
              v-model="password.confirm"
            >
             <span v-if="v$.password.confirm.$error"  class="text-danger">
                <span  v-for="item in v$.password.confirm.$errors" :key="item.id" style="display:block">
                      <i>{{ item.$message }}</i>
                </span><br>
            </span>
          </div>
          <div class="form-group">
            <label for="">Permission: </label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="permission"
            >
              <option value="">Select permission</option>
              <option value="admin">Admin</option>
              <option value="tester">Tester</option>
              <option value="user">User</option>
              </select>
               <span v-if="v$.permission.$error"  class="text-danger">
                <span  v-for="item in v$.permission.$errors" :key="item.id" style="display:block">
                      <i>{{ item.$message }}</i>
                </span><br>
            </span>
          </div>
          <button
            type="submit"
            class="btn btn-primary"
          >Add user</button>
            </form>
      </div>
    </div>

  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, minLength, email, sameAs } from "@vuelidate/validators";
export default {
  setup() {},
  data() {
    return {
      v$: useValidate(),
      email: "",
      username: "",
      password: {
        password: "",
        confirm: ""
      },
      permission: ""
    };
  },
  validations() {
    return {
      username: {
        required,
        minLength: minLength(7)
      },
      email: {
        required,
        email
      },
      password: {
        password: {
          required,
          minLength: minLength(7)
        },
        confirm: {
          required,
          minLength: minLength(7),
          sameAs: sameAs(this.password.password)
        }
      },
      permission:{
        required
      }
    };
  },
  methods: {
    onSubmit(){
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        const userNew = {
          username: this.username,
          password: this.password.password,
          email:this.email,
          permission:this.permission
        };
        console.log(userNew);
      }
      console.log(this.v$);
    }
  },
};
</script>
<style lang="css">
</style>