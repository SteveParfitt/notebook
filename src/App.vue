<template>
      <div id="app">
          <Notebook @change-page="changePage" @new-page="newPage" :pages="pages" :activePage="index" />
          <Page @save-page="savePage" @delete-page="deletePage" :page="pages[index]" />
      </div>
    </template>

    <script>
    import Notebook from './components/Notebook'
    import Page from './components/Page'
    import Firebase from 'firebase'

      
          
console.log(process.env.STEVE)
console.log(process.env.VUE_APP_API_KEY)
console.log(process.env.VUE_APP_DB_URL)
console.log(process.env.VUE_APP_AUTH_DOMAIN)
console.log(process.env.VUE_APP_PROJECT_ID)
console.log(process.env.VUE_APP_STORAGE_BUCKET)
console.log(process.env.VUE_APP_MESSAGING_SENDER_ID)

    var database = Firebase.initializeApp({
     apiKey: process.env.VUE_APP_API_KEY,
     authDomain: process.env.VUE_APP_AUTH_DOMAIN,
     databaseURL: process.env.VUE_APP_DB_URL,
     projectId: process.env.VUE_APP_PROJECT_ID,
     storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
     messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
    }).database().ref();

    export default {
      name: 'app',
      components: {
        Notebook,
        Page
      },
      data: () => ({
        pages: [],
        index: 0
      }),
      mounted() {
        database.once('value', (pages) => {
          pages.forEach((page) => {
            this.pages.push({
              ref: page.ref,
              title: page.child('title').val(),
              content: page.child('content').val()
            })
          })
        })
      },
      methods: {
        newPage () {
          this.pages.push({
            title: '',
            content: ''
          })
          this.index = this.pages.length - 1
        },
        changePage (index) {
          this.index = index
        },
        savePage () {
          var page = this.pages[this.index]
          if (page.ref) {
            this.updateExistingPage(page)
          } else {
            this.insertNewPage(page)
          }
        },
        updateExistingPage (page) {
          page.ref.set({
            title: page.title,
            content: page.content
          })
        },
        insertNewPage (page) {
          page.ref = database.push(page)
        },
        deletePage () {
          var ref = this.pages[this.index].ref
          ref && ref.remove()
          this.pages.splice(this.index, 1)
          this.index = Math.max(this.index - 1, 0)
        }
      }
    }
    </script>

    <style>
    html, body, #app {
        height: 100%;
    }

    body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        display: flex;
        flex-direction: row;
    }
    </style>