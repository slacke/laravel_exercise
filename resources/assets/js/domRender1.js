import React from "react"
import ReactDom from "react-dom"

import { Provider } from "react-redux"
import Layout from "./components/Layout"
import store from "./store"

const ReduxApp = document.getElementById('ReduxApp')
ReactDom.render(<Provider store = {store}>
                    <Layout />
                </Provider>
                ,ReduxApp)

