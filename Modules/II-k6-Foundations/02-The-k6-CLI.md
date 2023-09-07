# The k6 CLI

Once you have a k6 script, you can use the k6 Command Line Interface (CLI) to interact with it from your terminal. The k6 CLI can execute k6 test scripts and configure execution settings through sub-commands and flags.

The three most common commands are:

| Command   | Description                    | Usage            |
| --------- | ------------------------------ | ---------------- |
| `help`    | Displays all possible commands | `k6 help`        |
| `run`     | Executes a k6 script           | `k6 run test.js` |
| `version` | Displays installed k6 version  | `k6 version`                 |

_Flags_ are settings that are added to commands to change a part of the configuration. The following is an overview of common flags for the command `run`:


| Flag                   | Description                                                    | Usage                                    |
| ---------------------- | -------------------------------------------------------------- | ---------------------------------------- |
| `--help`               | Displays possible flags for the given command                  | `k6 run --help`                          |
| `--vus` or `-u`        | Sets number of virtual users                                   | `k6 run test.js --vus 10 --duration 30s` |
| `--duration`           | Sets the duration of the test                                  | `k6 run test.js --duration 10m`          |
| `--iterations` or `-i` | Instructs k6 to iterate the default function a number of times | `k6 run test.js -i 3`                    |
| `-e`                   | Sets an environment variable to pass to the script             | `k6 run test.js -e DOMAIN=test.k6.io`                                         |

This section goes over these common commands and flags.

## Help

Executing `k6 help` shows a list of all the available commands.

```plain
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

Usage:
  k6 [command]

Available Commands:
  archive     Create an archive
  cloud       Run a test on the cloud
  convert     Convert a HAR file to a k6 script
  help        Help about any command
  inspect     Inspect a script or archive
  login       Authenticate with a service
  pause       Pause a running test
  resume      Resume a paused test
  run         Start a load test
  scale       Scale a running test
  stats       Show test metrics
  status      Show test status
  version     Show application version

Flags:
  -a, --address string      address for the api server (default "localhost:6565")
  -c, --config string       JSON config file (default "/Users/nic/Library/Application Support/loadimpact/k6/config.json")
  -h, --help                help for k6
      --log-output string   change the output for k6 logs, possible values are stderr,stdout,none,loki[=host:port] (default "stderr")
      --logformat string    log output format
      --no-color            disable colored output
  -q, --quiet               disable progress updates
  -v, --verbose             enable verbose logging

Use "k6 [command] --help" for more information about a command.
```

To get information about a specific command, add the `--help` flag:

```shell
k6 run --help
```


## Execution and Execution Options: `run`

Another common k6 command is `k6 run [filename].js`. In the previous section, you learned how to use `k6 run` to execute an existing k6 script in JavaScript.

Without any modification, `k6 run` instructs k6 to run your script as it is (see [Changing settings in k6](02-The-k6-CLI.md#Changing-settings-in-k6) to understand how k6 determines which configuration settings to use). However, you can also use flags with the `run` command to override settings within the script (such as [k6 Load Test Options](06-k6-Load-Test-Options.md)) from the command line.

### The duration flag

The duration specifies how long the test executes for. You can set this on the command line with the flag `--duration`:

```shell
k6 run test.js --duration 30s
```

You can use `s`, `h`, and `m` to define the duration. The following are valid and equivalent arguments for this flag:
- 1h30m10s
- 5410s
- 90m10s

### The iterations flag

You can set the number of iterations with the `--iterations` or `-i` flag, like this:

```shell
k6 run test.js --iterations 100
k6 run test.js -i 100
```

In either of the two lines above, k6 will run 100 iterations of the script.

### Virtual user flags

You can adjust the number of virtual users with the `-u` or `--vus`s flag when running the test:

```shell
k6 run test.js --vus 10 --duration 1m
k6 run test.js -u 10 --iterations 100
```

The two lines above are equivalent, and they both instruct k6 to execute the file `test.js` with 10 virtual users. Each one also sets a test duration and a number of iterations.

### Environment variables

So far, you've learned how to set execution options on the command line, changing test parameters such as virtual users, test duration, the number of iterations, and stages within a test. What if you want to set _other_ variables on the command line?

In that case, you can use environment variables, variables whose values you can set outside of the k6 script.

For example, you could use the command line to set an environment variable to change the domain that your test script uses. This is useful when you routinely test multiple environments, such as staging and test.

To use an environment variable, define the variable in your script:

```js
import http from 'k6/http';

const hostname = `http://${__ENV.DOMAIN}`;

export default function () {
    let res = http.get(hostname + '/my_messages.php');
}
```

In the preceding script, `${__ENV.DOMAIN}` is an environment variable, but it's not defined anywhere in the script. Here's how to do define it during runtime:

```shell
k6 run test.js -e DOMAIN=test.k6.io
```

When the test is executed, it sends an HTTP GET request to `http://test.k6.io/my_messages.php`. By using environment variables, you can change the domain that your test targets without changing the script itself.

Despite the name, these variables can hold many types of information, not just information about the environment. Here are some other things you could use an environment variable for:
- think time
- tags you want to affix to requests for this run
- test data file to be used
- pages to exclude or include
- scenario

## Changing settings in k6

In this section, you learned how to use command-line flags and environment variables to change your script executes. You have also previously learned how to set some of these options within the script itself. Check the documentation for a [complete list of options](https://k6.io/docs/using-k6/k6-options/reference/).

What happens if there is a conflict between these two ways of changing k6 settings?

k6 always [prioritizes settings](https://k6.io/docs/using-k6/k6-options/how-to/#order-of-precedence) in this order:
1. Command-line flags
1. Environment variables
1. Exported k6 script options
1. Config file
1. Defaults

Command-line flags are given the highest priority and always override everything else. Plan your script execution accordingly.

## Test your knowledge

### Question 1

Which of the following commands runs a k6 script?

A: `k6 --vus 1 test.js`

B: `k6 run test.js`

C: `run test.js -vus 1`

### Question 2

Which of the following commands will yield a warning upon execution?

A: `k6 run test.js --duration 10m`

B: `k6 run test.js -i 3`

C: `k6 run test.js --users 3`

### Question 3

Which of the following statements about using environment variables is true?

A: To use an environment variable, the script needs to be updated *and* the environment variable must be set in the command line.

B: To use an environment variable, only the script needs to be updated to define the value of the variable.

C: To use an environment variable, only the command line flag must be used, and the value will automatically be passed to the script.

### Answers

1. B. The first option is missing the `run` keyword, and the third is missing `k6`. B is the only one that will actually run the script.
2. C. `--users` is not a valid option and will yield an `invalid argument` error on the CLI.
3. A. The value of an environment variable will not be taken by the k6 script unless the script is updated to accept it in addition to the value being passed on the command line.

