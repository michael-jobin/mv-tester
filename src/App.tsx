import { useState, useEffect } from 'react'
import MediaDisplay from './components/MediaDIsplay'
import MediaInput from './components/MediaInput'
import Range from './components/Range'
import './styles/app.scss'
import Checkbox from './components/CheckBox'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mediaSrc, setMediaSrc] = useState<string | null>(null)
  const [isVideo, setIsVideo] = useState(false)
  const [isUploaded, setIsUploaded] = useState(false)
  const [overlayOpacity, setOverlayOpacity] = useState(0)
  const [letterBox, setLetterBox] = useState(0)
  const [fontOpacity, setFontOpacity] = useState(false)

  // Media Upload
  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const fileType = file.type
      const isVideoFile = fileType.startsWith('video/')
      const isImageFile = fileType.startsWith('image/')

      if (isVideoFile || isImageFile) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target && typeof e.target.result === 'string') {
            setMediaSrc(e.target.result)
            setIsVideo(isVideoFile)
            setIsUploaded(true)
          }
        }
        reader.readAsDataURL(file)
      } else {
        alert('Invalid file type.')
      }
    }
  }

  // modal open close
  const handleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  // inputs
  const handleOpacityChange = (value: number) => {
    setOverlayOpacity(value)
    document.documentElement.style.setProperty('--overlayOpacity', value.toString())
  }

  const handleLetterBoxChange = (value: number) => {
    setLetterBox(value)
    document.documentElement.style.setProperty('--letterBox', `${value}%`)
  }

  const handleFontOpacityToggle = (checked: boolean) => {
    setFontOpacity(checked)
    document.documentElement.style.setProperty('--titleOpacity', checked ? '1' : '0')
  }

  const setVh = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  // Set vh
  useEffect(() => {
    handleOpacityChange(overlayOpacity)
    handleLetterBoxChange(letterBox)
    handleFontOpacityToggle(fontOpacity)
    setVh()
    window.addEventListener('resize', setVh)
    return () => window.removeEventListener('resize', setVh)
  }, [])

  return (
    <div className="app__wrapper">
      <MediaDisplay mediaSrc={mediaSrc} isVideo={isVideo} />
      {!isUploaded && (
        <div className="app__mediaInput">
          <MediaInput handleMediaUpload={handleMediaUpload} />
        </div>
      )}
      {isUploaded && (
        <>
          <div className="app__overlay"></div>
          <button
            className={`app__modal__btn ${isModalOpen && 'is-open'}`}
            onClick={handleModal}
            aria-label="open modal"
          ></button>
          <div className={`app__modal bg-dark ${isModalOpen && 'is-open'}`}>
            <div className="app__modal__container">
              <Checkbox
                onToggle={handleFontOpacityToggle}
                label="コピーを表示する"
                name="fontOpacityCheckbox"
                checked={fontOpacity}
              />
              <Range
                onValueChange={handleOpacityChange}
                value={overlayOpacity}
                min={0}
                max={1}
                step={0.01}
                name="overlayOpacityRange"
                label="オーバーレー"
              />
              <Range
                onValueChange={handleLetterBoxChange}
                value={letterBox}
                min={0}
                max={100}
                step={1}
                name="letterBoxRange"
                label="シネスコ"
              />
              <div className="app__otherFile">
                <div className="btn btn-primary w-100">別のファイルを選択</div>
                <MediaInput handleMediaUpload={handleMediaUpload} />
              </div>
            </div>
          </div>
          <div className="app__title">
            <img src="/assets/images/title.png" alt="title" width="1174" height="537" />
          </div>
        </>
      )}
    </div>
  )
}

export default App
