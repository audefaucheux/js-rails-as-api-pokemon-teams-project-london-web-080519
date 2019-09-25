class PokemonsController < ApplicationController

  def index 
    pokemons = Pokemon.all
    render json: pokemons
  end

  def create
    nickname = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_pokemon = Pokemon.create(nickname: nickname, species: species, trainer_id: params["pokemon"]["trainer_id"])
    render json: new_pokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
  end
end
