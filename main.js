import AwsS3 from '@uppy/aws-s3'
import Uppy from '@uppy/core'
import Dashboard from '@uppy/dashboard'
import GoogleDrive from '@uppy/google-drive'

import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

const uppy = new Uppy({
  debug: true,
  autoProceed: false,
})

uppy.use(GoogleDrive, {
  companionUrl: 'http://localhost:3020',
})
uppy.use(Dashboard, {
  inline: true,
  target: 'body',
  plugins: ['GoogleDrive'],
})
uppy.use(AwsS3, {
  companionUrl: 'http://localhost:3020',
})
