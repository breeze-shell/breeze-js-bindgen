$version = node -p "require('./package.json').version"
git add package.json
git commit -m "chore: release v$version"
git tag "v$version"
git push origin "v$version"
git push --tags
