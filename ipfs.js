import { create, globSource } from 'ipfs-http-client'

async function main () {

  const INFURA_PROJECT_ID = ''
  const INFURA_SECRET_KEY = ''
  const FULL_PATH_TO_IMAGES = ''

  try {
    const auth =
        'Basic ' + Buffer.from(INFURA_PROJECT_ID + ':' + INFURA_SECRET_KEY).toString('base64');
    const client = create({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth,
        },
    });
    const options = {
      wrapWithDirectory: true
    }
    for await (const file of client.addAll(globSource(FULL_PATH_TO_IMAGES, '**/*'), options)) {
      console.log(file)
    }
  } catch(err) {
    console.log(err)
    return process.exit()
  }
}

main()
