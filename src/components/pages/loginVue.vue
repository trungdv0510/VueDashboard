<template>
  <div class="bg-gradient-primary">
    <div class="container">
      <!-- Outer Row -->
      <div class="row justify-content-center">
        <div class="col-xl-10 col-lg-12 col-md-9">
          <div class="card o-hidden border-0 shadow-lg my-5">
            <div class="card-body p-0">
              <!-- Nested Row within Card Body -->
              <div class="row">
                <div class="col-lg-3 d-none d-lg-block"></div>
                <div class="col-lg-6">
                  <div class="p-5">
                    <div class="text-center">
                      <h1 class="h4 text-gray-900 mb-4">Automation
                        Testing</h1>
                      <h1 class="h4 text-gray-900 mb-4">Login</h1>
                    </div>
                    <form class="user" @submit.prevent="onSubmit">
                      <div v-if="message" :class="`alert ${type} alert-dismissible fade show`"  role="alert"> 
                       {{ message }}
                        <p type="button" class="close" data-dismiss="alert" aria-label="Close" @onclick="closeAlert()">
                          <span aria-hidden="true" class="alertClose">&times;</span>
                        </p>
                      </div>
                      <div class="form-group">
                        <input type="text" class="form-control
                                                    form-control-user" id="exampleInputEmail"
                          aria-describedby="emailHelp" placeholder="Enter user name..." v-model="username">
                        <span v-if="v$.username.$error" class="text-danger">
                          <span v-for="item in v$.username.$errors" :key="item.id" style="display:block">
                            <i>{{ item.$message }}</i>
                          </span> <br>
                        </span>
                      </div>
                      <div class="form-group">
                        <input type="password" class="form-control form-control-user" id="exampleInputPassword"
                          placeholder="Password" v-model="password">
                        <span v-if="v$.password.$error" class="text-danger">
                          <span v-for="item in v$.password.$errors" :key="item.id" style="display:block">
                            <i>{{ item.$message }}</i>
                          </span><br>
                        </span>
                      </div>
                      <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                          <input type="checkbox" class="custom-control-input" id="customCheck">
                          <label class="custom-control-label" for="customCheck">Remember Me </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary btn-user btn-block"> Login </button>
                      <hr>
                    </form>
                    <div class="text-center">
                      <a class="small" href="forgot-password.html">Forgot Password?</a>
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 d-none d-lg-block"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "loginVue",
  data() {
    return {
      v$: useValidate(),
      username: "",
      password: ""
    };
  },
  computed: mapGetters(["type", "message"]),
  validations() {
    return {
      username: {
        required,
        minLength: minLength(4),
      },
      password: {
        required,
        minLength: minLength(3)
      }
    };
  },
  methods: {
    ...mapActions(["login","clear"]),
    onSubmit() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const user = {
          username: this.username,
          password: this.password
        };
        this.login(user);
      }
    },
    closeAlert(){
      this.password = null;
      this.clear();
    }
  }
};
</script>