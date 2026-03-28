$version = node -p "require('./package.json').version"
git tag "v$version"
git push origin "v$version"
git push --tags
