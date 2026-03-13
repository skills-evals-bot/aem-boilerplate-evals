#!/bin/sh
case "$1" in
  *Username*) printf '%s\n' "x-access-token" ;;
  *Password*) printf '%s\n' "$EVAL_GH_TOKEN" ;;
  *) printf '\n' ;;
esac