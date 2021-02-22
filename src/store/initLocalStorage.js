let localStorage = {
  player: {},
  settings: {
    lang: null,
    appearance: "auto",
    musicQuality: 320000,
    showGithubIcon: true,
    showPlaylistsByAppleMusic: true,
    showUnavailableSongInGreyStyle: true,
    automaticallyCacheSongs: false,
    showLyricsTranslation: true,
    minimizeToTray: false,
  },
  data: {
    user: {
      user_uuid: '',
      first_name: '',
      last_name: '',
      email: '',
      email_verified_at: '',
      created_at: '',
      updated_at: '',
      deleted_at: '',
    },
    likedSongPlaylistID: 0,
    lastRefreshCookieDate: 0,
    loginMode: null,
    status: ''
  },
};

if (process.env.IS_ELECTRON === true) {
  localStorage.settings.automaticallyCacheSongs = true;
  localStorage.settings.showUnavailableSongInGreyStyle = false;
}

export default localStorage;
