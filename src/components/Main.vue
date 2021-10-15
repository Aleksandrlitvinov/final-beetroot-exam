<template>
  <div>
        <BoardComponent
            :board="board"
            :id-generate = "idGenerate"
            @show-add-owner-form="showAddOwnerForm"
        />
        <b-modal
            :visible="null !== editOwner"
            v-if="null !== editOwner"
            @hidden="editOwner = null"
            hide-footer
            hide-header
        >
          <form class="px-4 py-3" @submit.prevent="createOwner">
            <div class="form-group">
              <label for="formName">Name</label>
              <input
                  v-model.trim="editOwner.name"
                  type="text"
                  class="form-control mt-2 form__input"
                  id="formName"
                  placeholder="Aleksandr"
                  :class="{ invalid: $v.editOwner.name.$dirty && !$v.editOwner.name.required }"
              >
            </div>
            <div class="form-group">
              <label for="formSurname">Surname</label>
              <input
                  v-model.trim="editOwner.surname"
                  type="text"
                  class="form-control mt-2 form__input"
                  id="formSurname"
                  placeholder="Surname"
                  :class="{ invalid: $v.editOwner.surname.$dirty && !$v.editOwner.surname.required }"
              >
            </div>
            <div class="form-buttons">
              <button type="submit" class="btn btn-success btn-sm btn-block mt-2" @click="createOwner">Add Owner</button>
              <button class="btn btn-outline-dark btn-sm btn-block mt-2" @click="editOwner = null">Cancel</button>
            </div>
          </form>
        </b-modal>
  </div>
</template>

<script>
import BoardComponent from "./BoardComponent";
import { Board, Column, Owner } from "../app/models/models";
import { required } from "vuelidate/lib/validators";

let idCounter = 1;
const idGenerate = () => idCounter++;

export default {
  name: "App",
  components: {
    BoardComponent,
  },
  data(){
    return{
      board: new Board(),
      editOwner: null,
    }
  },
  validations: {
    editOwner:{
      name: {required},
      surname: { required },
    }

  },
  methods:{
    idGenerate (){
      return idGenerate();
    },
    showAddOwnerForm(){
      this.editOwner = new Owner();
    },
    createOwner() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
        this.editOwner.id = this.idGenerate();
        this.board.owners.push(this.editOwner);
        this.editOwner = null;
    },
  },
  mounted() {
    this.board.owners.push(new Owner({id: idGenerate(), name:'Ivan', surname:'Ivanov'}));
    this.board.owners.push(new Owner({id: idGenerate(), name:'Maria', surname:'Petrova'}));

    this.board.columns.push(new Column({id:idGenerate(), background: '#1C5A7C', title:'Pending Task'}))
    this.board.columns.push(new Column({id:idGenerate(), background: '#106354', title:'Ongoing Task'}))
    this.board.columns.push(new Column({id:idGenerate(), background: '#54117D', title:'Completed'}))
    this.board.columns.push(new Column({id:idGenerate(), background: '#71441B', title:'In Development'}))
    this.board.columns.push(new Column({id:idGenerate(), background: '#6E6D6D', title:'Live in Build'}))

    if (localStorage.board){
      this.board = localStorage.board
      this.board = JSON.parse(localStorage.getItem('board'));
    }
  },
};
</script>

<style lang="sass">
.form-buttons
  width: 100%
  display: flex
  justify-content: space-between

.invalid
  border: 1px solid red
</style>
