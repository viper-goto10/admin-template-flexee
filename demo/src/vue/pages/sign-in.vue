<template>
    <div class="card mx-auto w-max-5">
        <div class="card-header">Přihlášení</div>
        <div class="card-body">
            <h2 class="text-center"></h2>
            <form method="post" novalidate>
                <div class="form-group">
                    <input type="text" class="form-control" required v-model="name" />
                    <span class="floating-label">
                        <span v-if="!$v.name.$error">Uživatelské jméno</span>
                        <span
                            class="error"
                            v-if="$v.name.$error & !$v.name.required"
                        >Uživatelské jméno je povinné.</span>
                    </span>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" required />
                    <span class="floating-label">Heslo</span>
                </div>
                <div class="form-group text-right">
                    <button type="submit" class="btn btn-secondary" v-on:click.prevent="submit()">Přihlásit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);
import {
    required
} from "vuelidate/lib/validators";

export default {
    data() {
        return {
            name: ''
        }
    },
    methods: {
        submit() {
            var self = this;
            this.$v.$touch();
            if (this.$v.$invalid) {
                Vue.nextTick(function() {
                    self.$parent.scrollToError();
                });
                return false;
            } else {
                self.$router.push('dashboard');
            }
        }
    },
    validations() {
        return {
            name: {
                required
            }
        }
    }
};
</script>