#!/usr/bin/expect

set timeout 9
set username [string cat $env(EXPO_USERNAME) "\r"]
set password [string cat $env(EXPO_PASSWORD) "\r"]

spawn exp login

expect "Username"
send $username

expect "Password:"
send $password

expect "$ "