import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Home from './components/Homepage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import Player from './components/Player'
import ArtistPage from './components/ArtistPage'
import AlbumPage from './components/AlbumPage'
import MyLibrary from './components/MyLibrary'

function App () {
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <Col sm={2}>
            <Sidebar />
          </Col>
          <Col sm={10} className='col-12 col-md-9 offset-md-3 mainPage'>
            <Topbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/artist/:id' element={<ArtistPage />} />
              <Route path='/album/:id' element={<AlbumPage />} />
              <Route path='/library' element={<MyLibrary />} />
            </Routes>
            <Player />
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  )
}

export default App
