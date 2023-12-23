const baseURL = import.meta.env.VITE_API_URL

type AudioType = 'readyOrder' | 'deleted'
type AudioPlayer = (type: AudioType) => void

export default function useAudioPlayer() {
  // Проигрывание аудио файлов с сервера по параметру
  const play: AudioPlayer = (type: AudioType) => {
    let audioName: string = 'default-notify'
    switch (type) {
      case 'readyOrder':
        audioName = 'ready_order'
        break
      case 'deleted':
        audioName = 'deleted'
        break
    }
    const audio = new Audio(`${baseURL}audio/${audioName}.mp3`)
    audio.play()
  }

  return play
}
