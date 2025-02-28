import { createRoot } from 'react-dom/client'
import { Provider as ChakraProvider } from './components/ui/provider.tsx'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>
)
