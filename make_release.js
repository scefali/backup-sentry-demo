const SentryCli = require("@sentry/cli");

main();

async function main() {
  const cli = new SentryCli().releases;
  const version = "10.8.2";
  const prefix = "static/js";

  const options = { projects: ["test-sentry-cli-js", "test-steve"] };
  // const options = undefined;
  await cli.new(version, options);
  const setCommitOptions = { ...options, auto: true };
  await cli.setCommits(version, setCommitOptions);
  const sourceMapOptions = {
    ...options,
    urlPrefix: `~/${prefix}`,
    validate: true,
    include: [`build/${prefix}`],
  };
  await cli.uploadSourceMaps(version, sourceMapOptions);
}
