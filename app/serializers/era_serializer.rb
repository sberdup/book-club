class EraSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :time
  def time 
    object.time&.strftime('%A, %d %b %Y %l:%M %p')
  end
end
