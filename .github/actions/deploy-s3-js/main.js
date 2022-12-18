const core = require('@actions/core');
const exec = require('@actions/exec');

const inputs = {
    bucket: {
        name: 'bucket',
        required: true
    },
    bucketRegion: {
        name: 'bucket-region',
        required: true
    },
    distDir: {
        name: 'dist-dir',
        required: true
    }
}

async function run() {
    const { bucket, bucketRegion, distDir } = Object.entries(inputs).reduce((acc, [key, {name, required}]) => ({
        ...acc,
        [key]: core.getInput(name, {required})
    }), {});

    const s3Uri = `s3://${bucket}`;
    await exec.exec(`aws s3 sync ${distDir} ${s3Uri} --region ${bucketRegion}`);

    const webSiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com/`;
    core.setOutput('website-url', webSiteUrl);
}

run();