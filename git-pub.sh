git tag v$(node -p "require('./package.json').version")
git push --tags
