# The k6 CLI

Once you have a k6 script, you can use the k6 Command Line Interface (CLI) to interact with it from your terminal. The k6 CLI allows you to:
- set test parameters and other test settings
- execute your test scripts and even control their execution on the fly
- run tests on, or send results to, k6 Cloud (optional)
- change the logging settings during the test

and many more. 

In this section, you'll learn some of the most commonly used commands in the k6 CLI.

All of these commands can be accessed with the keyword `k6 [command]`.

## Help

If there's one command you should remember, it's `k6 help`. Executing this command will show you a list of all the available commands. 

```shell
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

To get even more information about a particular command, you can add the `--help` flag, like this:

```shell
k6 run --help
```


## Execution and Execution Options

Another common k6 command is `k6 run [filename].js`. In the previous section, you learned how to use `k6 run` to execute an existing k6 script in JavaScript. 

Without any modification, `k6 run` instructs k6 to run your script as it is (see [Changing settings in k6](The%20k6%20CLI.md#Changing%20settings%20in%20k6) to understand how k6 determines which configuration settings to use). However, you can also use flags with the `run` command to override settings within the script (such as [k6 Load Test Options](k6%20Load%20Test%20Options.md)) from the command line.

### Setting test parameters

#### Virtual users

You can adjust the number of virtual users on the fly by adding the `-u` or `--vus` flag when running the test:

```shell
k6 run test.js --vus 10
k6 run test.js -u 10
```

The two lines above are equivalent, and they both instruct k6 to execute the file `test.js` with 10 virtual users.

```ad-warning
You can only set the number of virtual users if you are _also_ setting the number of iterations, the total test duration, or stages for the test.
```

#### Duration

The duration specifies how long the test will execute for, and you can set this on the command line by using the flag `--duration` like this:

```shell
k6 run test.js --vus 10 --duration 30s
```

You can use `s`, `h`, and `m` to define the duration. The following are valid values for this flag, and are all equivalent:
- 1h30m10s
- 5410s
- 90m10s

#### Iterations



#### Stage

#### Requests Per Second (RPS)

### Environment variables

### k6 Cloud




## Logging


## Changing settings in k6



- Command-line flags
- Environment variables
- Exported script options
- Config file
- Defaults
## Test your knowledge

### Question 1



A: 

B: 

C: 

### Question 2



A: 

B: 

C: 

### Question 3



A: 

B: 

C: 

### Answers

