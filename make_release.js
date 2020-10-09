const SentryCli = require("@sentry/cli");

main();

async function main() {
  const cli = new SentryCli().releases;
  const version = "10.9.3";
  const prefix = "static/js";

  const projects = ["test-sentry-cli-js", "test-steve"];
  await cli.new(version, { projects });
  await cli.setCommits(version, { auto: true });

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
