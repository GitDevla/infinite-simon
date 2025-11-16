#!/bin/sh
set -e

echo "Seeding..."
npm run db:setup

echo "Starting app..."
exec "$@"