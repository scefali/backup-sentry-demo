const SentryCli = require("@sentry/cli");

main();

async function main() {
  const cli = new SentryCli().releases;
  const version = "10.8.7";
  const prefix = "static/js";

  const projects = ["test-sentry-cli-js", "test-steve"];
  const options = { projects };
  // const options = { projects: ["test-sentry-cli-js"] };
  await cli.new(version, options);
  const setCommitOptions = { auto: true };
  await cli.setCommits(version, setCommitOptions);

  await Promise.all(
    projects.map((project) => {
      const sourceMapOptions = {
        projects: [project],
        urlPrefix: `~/${prefix}`,
        validate: true,
        include: [`build/${prefix}`],
      };
      return cli.uploadSourceMaps(version, sourceMapOptions);
    })
  );
}
