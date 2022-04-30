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
                                        <form
                                            class="user"
                                            @submit.prevent="onSubmit">
                                            <div class="form-group">
                                                <input
                                                    type="text"
                                                    class="form-control
                                                    form-control-user"
                                                    id="exampleInputEmail"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Enter user name..."
                                                    v-model="username">
                                                <span v-if="v$.username.$error" class="text-danger">
                                                      <span  v-for="item in v$.username.$errors" :key="item.id"  style="display:block">
                                                         <i>{{ item.$message }}</i>
                                                    </span> <br>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <input  type="password" class="form-control form-control-user" id="exampleInputPassword" placeholder="Password"  v-model="password">
                                                <span v-if="v$.password.$error"  class="text-danger">
                                                    <span  v-for="item in v$.password.$errors" :key="item.id" style="display:block">
                                                         <i>{{ item.$message }}</i>
                                                    </span><br>
                                                </span>
                                            </div>
                                            <div class="form-group">
                                                <div class="custom-control custom-checkbox small">
                                                    <input type="checkbox"  class="custom-control-input" id="customCheck">
                                                    <label class="custom-control-label" for="customCheck">Remember Me  </label>
                                                </div>
                                            </div>
                                            <button type="submit"  class="btn btn-primary btn-user btn-block"> Login </button>
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
import { required,minLength } from "@vuelidate/validators";
import { mapMutations, mapGetters } from 'vuex'
import {setCookie} from "@/utils/localStorerage.js";
export default {
  name: "loginVue",
  data() {
    return {
      v$: useValidate(),
      username: "",
      password: ""
    };
  },
  computed:mapGetters(["auth"]),
  validations() {
    return {
      username: { 
        required,
        minLength:minLength(7),
    },
      password: { 
        required,
        minLength:minLength(7) 
      }
    };
  },
  methods: {
    ...mapMutations(["SET_AUTH"]),
    onSubmit() {
      console.log("đã click submit");
      this.v$.$validate(); // checks all inputs
      if (!this.v$.$error) {
        const user = {
          username: this.username,
          password: this.password
        };
        console.log(user);
        setCookie("user",this.username,2);
        this.SET_AUTH(true);
        window.location.href = '/index'
      }
      console.log(this.v$);
    }
  }
};
</script>