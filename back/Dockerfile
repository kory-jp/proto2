FROM ruby:3.0.0 
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update -qq && apt-get install -y build-essential nodejs yarn\
  && apt-get install -y nodejs mariadb-client
RUN mkdir /proto2
WORKDIR /proto2
COPY Gemfile /proto2/Gemfile
COPY Gemfile.lock /proto2/Gemfile.lock
RUN bundle install
COPY . /proto2

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]
EXPOSE 3001

CMD ["rails", "server", "-b", "0.0.0.0"]